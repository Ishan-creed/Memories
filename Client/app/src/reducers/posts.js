export default (posts = [],action) =>{
   switch (action.type) {

      case 'DELETE':

      return posts.filter((post) => post.id === action.payload);

    case 'FETCH-ALL':
               
    return action.payload;

     case 'CREATE':
        return [...posts, action.payload];

     case 'UPDATE':
      return posts.map((post) => post._id === action.payload.id ? action.payload.id : post);   
   
    default:
        return posts;
   }
}