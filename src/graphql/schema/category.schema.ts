import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
class Category {
  @Field(type => Int)
  id: number;

  @Field()
  name: string;
}

export default Category;