import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class BookCategory {
  @Field(type => Int)
  bookId: number;

  @Field(type => Int)
  categoryId: number;
}

export default BookCategory;