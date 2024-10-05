import Config from "../../config/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Services {
  client = new Client()
  databases;
  storage;

  constructor(){
    this.client
    .setEndpoint(Config.appwriteURL)
    .setProject(Config.appwriteProjectId);
    this.databases = new Databases(this.client)
    this.storage = new Storage(this.client)
  }

  async createPost({title, slug, content, featureImage, status, userId}){
       
    try {
        return await this.databases.createDocument(
            Config.appwriteDatabaseId,
            Config.appwriteCollectionId,
            slug,
            {
               title,
               content,
                featureImage,
                status,
                userId,
            }

        )
        
    } catch (error) {
        throw error
    }
  }
}

const services = new Services();
export default services;
