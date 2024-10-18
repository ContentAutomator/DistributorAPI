import { IsString, IsNotEmpty } from 'class-validator';

export class AutoPromptDto {
    @IsString()
    @IsNotEmpty()
    auto_prompt_category: string;

    @IsString()
    @IsNotEmpty()
    auto_prompt_template: string;

    @IsString()
    @IsNotEmpty()
    secret_key: string;
}
