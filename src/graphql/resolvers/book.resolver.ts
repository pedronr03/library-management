import { PrismaClient } from "@prisma/client";
import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import BookEntity from "../../entities/book.entity";
import CreateBookInput from "../inputs/book/create-book.input";
import UpdateBookInput from "../inputs/book/update-book.input";
import Book from "../schema/book.schema";

@Resolver((of) => Book)
class BookResolver {
  constructor(private readonly prisma = new PrismaClient()) {}

  @Query((returns) => [Book])
  getBooks() {
    return this.prisma.book.findMany();
  }

  @Query((returns) => Book)
  async getBook(@Arg("id") id: number) {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) throw new Error("Book not found");
    return book;
  }

  @Mutation((returns) => Book)
  async createBook(@Arg("bookData") bookData: CreateBookInput) {
    await this.validateForeignKeys(bookData.authorId, bookData?.photoId);
    const publishedDate = new Date(bookData.publishedDate);
    this.validatePublishedDate(publishedDate);
    bookData.publishedDate = publishedDate;
    const newBook = this.prisma.book.create({ data: bookData });
    return newBook;
  }

  @Mutation((returns) => Book)
  async updateBook(@Arg("bookData") bookData: UpdateBookInput) {
    const bookSearch = await this.getBook(bookData.id);
    const updatedBook = { ...bookSearch, ...bookData };
    await this.validateForeignKeys(updatedBook.authorId, updatedBook?.photoId);
    const publishedDate = new Date(updatedBook.publishedDate);
    this.validatePublishedDate(publishedDate);
    updatedBook.publishedDate = publishedDate;
    await this.prisma.book.update({
      where: { id: updatedBook.id },
      data: updatedBook,
    });
    return updatedBook;
  }

  @Mutation((returns) => Book)
  async remove(@Arg("id") id: number) {
    const bookSearch = await this.getBook(id);
    await this.prisma.book.delete({ where: { id } });
    return bookSearch;
  }

  @FieldResolver()
  async categories(@Root() book: BookEntity) {
    const categories = this.prisma.category.findMany({
      where: { books: { some: { bookId: book.id } } },
    });
    return categories;
  }

  @FieldResolver()
  async photo(@Root() book: BookEntity) {
    if (!book.photoId) return null;
    const photo = this.prisma.photo.findUnique({ where: { id: book.photoId } });
    return photo;
  }

  @FieldResolver()
  async author(@Root() book: BookEntity) {
    const author = this.prisma.author.findUnique({ where: { id: book.authorId } });
    return author;
  }

  private validatePublishedDate(publishedDate: Date) {
    const date = publishedDate
      .toLocaleDateString('en-US', {year: 'numeric', month: '2-digit', day: '2-digit'});
    const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    const validate = regex.test(date);
    if (!validate) throw new Error('publishedDate is invalid');
  }

  private async validateForeignKeys(
    authorId: number,
    photoId: number | undefined
  ): Promise<void> {
    if (photoId) {
      const photo = await this.prisma.photo.findUnique({
        where: { id: photoId },
      });
      if (!photo) throw new Error("Photo not found");
    }
    const author = await this.prisma.author.findUnique({
      where: { id: authorId },
    });
    if (!author) throw new Error("Author not found");
  }
}

export default BookResolver;
