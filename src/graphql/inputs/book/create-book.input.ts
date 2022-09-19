import { Field, Float, InputType, Int } from "type-graphql";
import { IsDate, Length } from 'class-validator';

@InputType()
class CreateBookInput {
  @Field()
  title: string;

  @Field()
  @Length(13, 13)
  isbn: string;

  @Field(type => Int)
  totalPages: number;

  @Field(type => Float)
  rating: number;

  @Field()
  publishedDate: Date;

  @Field(type => Int, { nullable: true })
  photoId?: number;

  @Field(type => Int)
  authorId: number;
}

export default CreateBookInput;