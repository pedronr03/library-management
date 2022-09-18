import { Field, Float, Int, ObjectType } from "type-graphql";
import Author from "./author.schema";
import Category from "./category.schema";
import Photo from "./photo.schema";

@ObjectType()
class Book {
  @Field(type => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  isbn: string;

  @Field(type => Int)
  totalPages: number;

  @Field(type => Float)
  rating: number;

  @Field()
  publishedDate: Date;

  @Field(type => Category)
  category: Category;

  @Field(type => Author)
  author: Author;

  @Field(type => Photo)
  photo: Photo;
}

export default Book;
