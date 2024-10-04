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
  IsString 
} from 'class-validator';

export class VideoDetailsDto {
  @IsString()
  @IsNotEmpty()
  prompt: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  description: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  secret_key: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsString()
  @IsNotEmpty()
  resolution: string;

  @IsString()
  @IsNotEmpty()
  format: string;

  // @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbnail_url: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsString()
  video_url: string;

  @IsString()
  @IsNotEmpty()
  message: string;

  @IsString()
  @IsNotEmpty()
  callback_url: string;

  @IsString()
  @IsNotEmpty()
  job_id: string;
}
