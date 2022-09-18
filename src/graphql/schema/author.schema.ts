import { Field, Int, ObjectType } from "type-graphql";
import Book from "./book.schema";

@ObjectType()
class Author {
  @Field(type => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birthDate: Date;

  @Field(type => [Book])
  books: Book[]
}

export default Author;