/**
 * Fawry Promotion Engine
 * Api for creating and managing campaigns and promotions
 *
 * OpenAPI spec version: 1.0.0
 * Contact: info@fawry.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import {UserModel} from './UserModel';
import { RolesPermissionModel } from './rolesPermissionModel';


export interface UserRoleModel {
    code?: string;
    createdBy?: UserModel;
    createdDate?: Date;
    id?: number;
    nameAr?: string;
    nameEn?: string;
    permissions?: Array<RolesPermissionModel>;
}






