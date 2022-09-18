import { Resolver } from "type-graphql";
import Category from "../schema/category.schema";

@Resolver(of => Category)
class CategoryResolver {
  
}

export default CategoryResolver;