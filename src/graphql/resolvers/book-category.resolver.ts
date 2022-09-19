import { PrismaClient } from "@prisma/client";
import { Args, Mutation, Resolver } from "type-graphql";
import CreateBookCategoryArg from "../args/book-category/create-book-category.arg";
import DeleteBookCategoryArg from "../args/book-category/delete-book-category.arg";
import BookCategory from "../schema/book-category.schema";

@Resolver((of) => BookCategory)
class BookCategoryResolver {
  constructor(private readonly prisma = new PrismaClient()) {}

  @Mutation((returns) => BookCategory)
  async createBookCategory(
    @Args() { bookId, categoryId }: CreateBookCategoryArg
  ) {
    const associationSearch = await this.verifyPrimaryKeys(bookId, categoryId);
    if (associationSearch) throw new Error("This association already exists");
    await this.prisma.bookCategory.create({
      data: { bookId, categoryId },
    });
    return { bookId, categoryId };
  }

  @Mutation((returns) => BookCategory)
  async deleteBookCategory(
    @Args() { bookId, categoryId }: DeleteBookCategoryArg
  ) {
    const associationSearch = await this.verifyPrimaryKeys(bookId, categoryId);
    if (!associationSearch) throw new Error("This association no exists");
    await this.prisma.bookCategory.delete({
      where: { bookId_categoryId: { bookId, categoryId } },
    });
    return { bookId, categoryId };
  }

  private async verifyPrimaryKeys(bookId: number, categoryId: number) {
    const bookCategory = this.prisma.bookCategory.findUnique({
      where: {
        bookId_categoryId: {
          bookId,
          categoryId,
        },
      },
    });
    return bookCategory;
  }
}

export default BookCategoryResolver;
