import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()

export class OtpModel{
    @Prop({required : true, unique : true})
    email : string

    @Prop({required : true, unique : true})
    otp : string
}

export const otpSchema = SchemaFactory.createForClass(OtpModel);