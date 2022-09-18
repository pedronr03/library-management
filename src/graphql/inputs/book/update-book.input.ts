import { IsDate, Length } from "class-validator";
import { Field, Float, InputType, Int } from "type-graphql";

@InputType()
class UpdateBookInput {
  @Field(type => Int)
  id: number;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  @Length(13, 13)
  isbn?: string;

  @Field(type => Int, { nullable: true })
  totalPages?: number;

  @Field(type => Float, { nullable: true })
  rating?: number;

  @Field({ nullable: true })
  @IsDate()
  publishedDate?: Date;

  @Field(type => Int, { nullable: true })
  photoId?: number;

  @Field(type => Int, { nullable: true })
  authorId?: number;
}

export default UpdateBookInput;