import { Field, InputType, Int } from "type-graphql";

@InputType()
class UpdateAuthorInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  firstName?: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  birthDate?: Date;
}

export default UpdateAuthorInput;