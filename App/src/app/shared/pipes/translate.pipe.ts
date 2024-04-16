import { Pipe, PipeTransform } from "@angular/core";
import { english } from "../../../assets/i18n/en";
import { hindi } from "../../../assets/i18n/hi";
import { languageConst } from "../../../assets/language";

@Pipe({
  name: "translate",
  pure:false
})
export class TranslatePipe implements PipeTransform {
  langConst=languageConst
  transform(value: string, ...args: unknown[]): any {
    try {
      let language = localStorage.getItem("language") || "en";
     return this.langConst[language][value]
    } catch (error) {
      return value;
    }
  }
}
