import { Field, InputType, Int } from "type-graphql"

@InputType()
class UpdatePhotoInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  url?: string;
}

export default UpdatePhotoInput;