import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"; 

@Schema()

export class User{
    @Prop({required : true})
    firstname: string ;

    @Prop({required : true})
    lastname : string ;

    @Prop({required : true, unique : true})
    email : string 

    @Prop({required : true})
    phone : string

    @Prop({required : true})
    password : string

    @Prop({required : true,default:false})
    emailVerified : boolean

    @Prop()
    otp?: string

    @Prop()
    userImage : string

}

export const UserSchema = SchemaFactory.createForClass(User) ;