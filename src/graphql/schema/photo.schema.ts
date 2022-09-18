import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class Photo {
  @Field(type => Int)
  id: number;

  @Field()
  url: string;
}

export default Photo;