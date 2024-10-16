import Config from "../../config/config.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services{
  client = new Client()
  databases;
  storage;

  constructor(){
    this.client
    .setEndpoint(Config.appwriteUrl)
    .setProject(Config.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  async createPost({title, slug, content, featuredImage, status, userId}){
       
    try {
        return await this.databases.createDocument(
            Config.appwriteDatabaseId,
            Config.appwriteCollectionId,
            slug,
            {
               title,
               content,
                featuredImage,
                status,
                userId,
            }

        )
        
    } catch (error) {
        throw console.log("Appwrite service :: createPost :: error",  error);
        
    }
  }

  async updatePost(slug ,{title,  content, featuredImage, status}){
    try {
      return await this.databases.updateDocument(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        slug,
        {
         title,
         content,
         status,
         featuredImage,
         }
      )
    } catch (error) {
      console.log("Appwrite services  :: updatePost error" , error);
      
    }
  }

  async deletePost(slug){
  try {
     await this.databases.deleteDocument(
      Config.appwriteDatabaseId,
      Config.appwriteCollectionId,
      slug,
    )
    return true
  } catch (error) {
    console.log("Appwrite service:: deletePost error" , error);
    return false
  }
  }
  
  async getPost(slug){
    try {
      
      return await this.databases.getDocument(
              Config.appwriteDatabaseId,
              Config.appwriteCollectionId,
              slug,
      )
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return false;

    }
  }

  async getPosts(queries = [Query.equal("status","active")]){
    try {
      return await this.databases.listDocuments(
        Config.appwriteDatabaseId,
        Config.appwriteCollectionId,
        queries,
      )
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return false;
    }
  }
  // file upload services

   async uploadFile(file){
    try {
      return await this.bucket.createFile(
        Config.appwriteBucketId,
        ID.unique(),
        file,
      )
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
      
    }
   }

   async deleteFile(fileId){
    try {
      await this.bucket.deleteFile(
        Config.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
   }

     getFilePreview(fileId){
      return this.bucket.getFilePreview(
        Config.appwriteBucketId,
        fileId
      )

     }
   
}

const services = new Services();
export default services;
