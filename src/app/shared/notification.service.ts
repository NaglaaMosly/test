import {Subject} from "rxjs";
import {Injectable} from "@angular/core";
import {concatMap, distinctUntilChanged, filter, windowTime} from "rxjs/operators";

declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifyErrorSubject = new Subject<String>();

  constructor() {
    this.notifyErrorSubject
      .pipe(
        windowTime(1000),
        concatMap(obs => obs.pipe(distinctUntilChanged())),
      )
      .subscribe(message => {
        this.notify(message, 'danger');
      });
  }

  public notify(message, type = "success") {
    $.notify({
      title: 'info',
      message: '<strong>' + message + '</strong>',
      icon: 'g-icon-success-style glyphicon glyphicon-ok'
    }, {
      type: type,
      delay: type === 'danger' ? 6000 : 4000,
      template:
      "<div id='notification-box' data-notify='container' class=\"our-services-wrapper mb-60\">" +
      " <div class=\"services-inner animated fadeIn\">" +
      " <div class=\"our-services-img\">" +
      "  </div>" +
      "  <button data-dismiss=\"notification-box\" type=\"button\" class=\"close close-btn\" aria-label=\"Close\">" +
      "   <span aria-hidden=\"true\">&times;</span>" +
      "  </button>" +
      "  <div class=\"our-services-text\">" +
      "   <h4 class=\"h4-fail\">{1}</h4>" +
      "   <p id='notification-message'>{2}</p>" +
      "  </div>" +
      " </div>" +
      "</div>",
      placement: {
        from: "bottom",
        align: "right"
      }
    });
  }

  public notifyError(message: string) {
    this.notifyErrorSubject.next(message);
  }
}
