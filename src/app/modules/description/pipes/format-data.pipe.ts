import { Pipe, PipeTransform } from "@angular/core";
import * as moment from 'moment'

@Pipe({
    name: 'formatData'
})
export class FormatDataPipe implements PipeTransform {

    transform(date: string) {
        
        const dateFormat = new Date(date);
        return moment(dateFormat).format('YYYY-MM-DD, h:mm:ss a');
    }
}