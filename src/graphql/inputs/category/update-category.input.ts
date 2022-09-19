import { Field, InputType, Int } from "type-graphql"

@InputType()
class UpdateCategoryInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  name?: string;
}

export default UpdateCategoryInput;