import { Resolver } from "type-graphql";
import Photo from "../schema/photo.schema";

@Resolver(of => Photo)
class PhotoResolver {
  
}

export default PhotoResolver;