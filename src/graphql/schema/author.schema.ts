import { Field, Int, ObjectType } from "type-graphql";

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
}

export default Author;