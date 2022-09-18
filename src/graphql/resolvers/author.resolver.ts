import { Resolver } from "type-graphql";
import Author from "../schema/author.schema";

@Resolver(of => Author)
class AuthorResolver {
  
}

export default AuthorResolver;