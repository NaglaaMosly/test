import {Pipe, PipeTransform} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";
import {Constants} from "../constants";


@Pipe({name: 'translateName'})
export class TranslateNamePipe implements PipeTransform {
  constructor (private translateService: TranslateService) {}
  transform(obj: Object): String {
    if ( obj == null) { return; }
    if (this.translateService.currentLang === Constants.ENGLISH_LOCAL_ID) {
      return obj["nameEn"];
    } else {
      return obj["nameAr"];
    }
  }
}
