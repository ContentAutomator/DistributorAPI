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
import { IsNotEmpty, IsString } from 'class-validator';

export class VideoDetailsDto {
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
}
