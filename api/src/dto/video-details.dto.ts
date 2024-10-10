/**
 * This file contains the implementation of [describe the main functionality or purpose of the code].
 *
 * It includes the following key components:
 * - [Component 1]: [Brief description of Component 1]
 * - [Component 2]: [Brief description of Component 2]
 * - [Component 3]: [Brief description of Component 3]
 *
 * Usage:
 * - [Describe how to use the code or any important usage instructions]
 *
 * Dependencies:
 * - [List any external libraries or dependencies required by the code]
 *
 * Author: [Your Name]
 * Date: [Date]
 */

// import { ApiProperty } from '@nestjs/swagger';
import { 
  IsNumber,
  IsNotEmpty, 
  IsString,
  IsOptional
} from 'class-validator';

export class VideoDetailsDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title?: string;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  description?: string;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  url?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  secret_key: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  resolution?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  format?: string;

  // @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  thumbnail_url?: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // visual_prompt: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  status?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  video_url?: string;

  @IsString()
  @IsNotEmpty()
  message?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  callback_url?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  job_id?: string;
}
