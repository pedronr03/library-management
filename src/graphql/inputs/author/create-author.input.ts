import { Field, InputType } from "type-graphql";

@InputType()
class CreateAuthorInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  birthDate: Date;
}

export default CreateAuthorInput;