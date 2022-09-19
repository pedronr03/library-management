import { Field, InputType } from "type-graphql";

@InputType()
class CreateCategoryInput {
  @Field()
  name: string;
}

export default CreateCategoryInput;