import {Component, OnInit} from '@angular/core';
import {SortEvent} from "../../../../shared/directives/advanced-sortable.directive";
import {StudyService} from "../../service/study.service";
import {DicomService} from "../../service/dicom.service";

@Component({
  selector: 'app-study-list',
  templateUrl: './study-list.component.html',
  styleUrls: ['./study-list.component.scss']
})
export class StudyListComponent implements OnInit {

  studies: any[] | undefined;
  constructor(private service: StudyService, private dicomService: DicomService) {
  }

  ngOnInit(): void {
    this.getStudies();
  }

  getStudies() {
    const params = {
      limit: 5,
      offset: 0,
      fuzzymatching: false,
      includefield: "00081030,00080060",
      StudyDate: "19521009-20210321"
    };
    this.service.getStudies(params).subscribe(data => {
      this.studies = this.dicomService.resultDataToStudies(data);
      console.log(this.studies);
    })
  }


  handleClick(study: any) {
    //
    console.log(study);
  }
  onSort({column, direction}: any) {
    console.log("column, direction", column, direction)
  }
}
