import { Pipe, PipeTransform } from "@angular/core";
import { english } from "../../../assets/i18n/en";
import { hindi } from "../../../assets/i18n/hi";

@Pipe({
  name: "translate",
})
export class TranslatePipe implements PipeTransform {
  // language='en'
  transform(value: string, ...args: unknown[]): any {
    try {
      let language = localStorage.getItem("language") || "en";

      return language == "en" ? english[value] : hindi[value];
    } catch (error) {
      console.log("error", error);
      return english[value];
    }
  }
}
