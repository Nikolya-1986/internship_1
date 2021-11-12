import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'changeTextButtonPipe'
})
export class ChangeTextButtonPipe implements PipeTransform {

    transform(text: string): string {

        const values = text.split(new RegExp(/[a-z]/gmi));

        return `Serie: ${values[1]} Episode: ${values[2]}`;
    }
}