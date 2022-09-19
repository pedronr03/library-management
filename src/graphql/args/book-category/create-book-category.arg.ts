import { ArgsType, Field, Int } from "type-graphql";

@ArgsType()
class CreateBookCategoryArg {
  @Field(type => Int)
  bookId: number;

  @Field(type => Int)
  categoryId: number;
}

export default CreateBookCategoryArg;