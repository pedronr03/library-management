import { Field, InputType, Int } from "type-graphql"

@InputType()
class CreatePhotoInput {
  @Field()
  url: string;
}

export default CreatePhotoInput;