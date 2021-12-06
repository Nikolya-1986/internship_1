import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'changeText'
})
export class ChangeTextPipe implements PipeTransform {

    transform(text: string): string {

        const values = text.split(new RegExp(/[e,s]/gmi));

        return `Serie: ${values[1]} Episode: ${values[2]}`;
    }
}