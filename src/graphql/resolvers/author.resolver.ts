import { PrismaClient } from "@prisma/client";
import { Arg, FieldResolver, Mutation, Query, Resolver, Root } from "type-graphql";
import AuthorEntity from "../../entities/author.entity";
import CreateAuthorInput from "../inputs/author/create-author.input";
import UpdateAuthorInput from "../inputs/author/update-author.input";
import Author from "../schema/author.schema";

@Resolver((of) => Author)
class AuthorResolver {
  constructor(private readonly prisma = new PrismaClient()) {}

  @Query((returns) => [Author])
  getAuthors() {
    return this.prisma.author.findMany();
  }

  @Query((returns) => Author)
  async getAuthor(@Arg("id") id: number) {
    const author = await this.prisma.author.findUnique({ where: { id } });
    if (!author) throw new Error("Author not found");
    return author;
  }

  @Mutation((returns) => Author)
  async createAuthor(@Arg("authorData") authorData: CreateAuthorInput) {
    const newAuthor = this.prisma.author.create({ data: authorData });
    const birthDate = new Date(authorData.birthDate);
    this.validateBirthDate(birthDate);
    authorData.birthDate = birthDate;
    return newAuthor;
  }

  @Mutation((returns) => Author)
  async updateAuthor(@Arg("authorData") authorData: UpdateAuthorInput) {
    const authorSearch = await this.getAuthor(authorData.id);
    const updatedAuthor = { ...authorSearch, ...authorData };
    const birthDate = new Date(updatedAuthor.birthDate);
    this.validateBirthDate(birthDate);
    updatedAuthor.birthDate = birthDate;
    await this.prisma.author.update({
      where: { id: updatedAuthor.id },
      data: updatedAuthor,
    });
    return updatedAuthor;
  }

  @Mutation((returns) => Author)
  async deleteAuthor(@Arg("id") id: number) {
    const authorSearch = await this.getAuthor(id);
    await this.prisma.author.delete({ where: { id } });
    return authorSearch;
  }

  @FieldResolver()
  async books(@Root() author: AuthorEntity) {
    const books = this.prisma.book.findMany({
      where: { author: { id: author.id } },
    });
    return books;
  }

  private validateBirthDate(birthDate: Date) {
    const date = birthDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const validate = regex.test(date);
    if (!validate) throw new Error("birthDate is invalid");
  }
}

export default AuthorResolver;
