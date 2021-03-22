import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DicomService {

  constructor() {
  }


  resultDataToStudies(resultData: any[]): any[] {
    const studies: any[] = [];
    if (!resultData || !resultData.length) return [];
    resultData.forEach(study =>
      studies.push({
        StudyInstanceUID: this.getString(study['0020000D']),
        // 00080005 = SpecificCharacterSet
        StudyDate: this.getDate(study['00080020']),
        StudyTime: this.getString(study['00080030']),
        AccessionNumber: this.getString(study['00080050']),
        referringPhysicianName: this.getString(study['00080090']),
        // 00081190 = URL
        PatientName: this.getName(study['00100010']),
        PatientID: this.getString(study['00100020']),
        PatientBirthdate: this.getString(study['00100030']),
        patientSex: this.getString(study['00100040']),
        studyId: this.getString(study['00200010']),
        numberOfStudyRelatedSeries: this.getString(study['00201206']),
        numberOfStudyRelatedInstances: this.getString(study['00201208']),
        StudyDescription: this.getString(study['00081030']),
        // Modality: this.getString(study['00080060']),
        // ModalitiesInStudy: this.getString(study['00080061']),
        modalities: this.getString(
          this.getModalities(study['00080060'], study['00080061'])
        ),
      })
    );
    return studies;
  }

  getAttribute(element: any, defaultValue: any = '') {
    if (!element) {
      return defaultValue;
    }
    // Value is not present if the attribute has a zero length value
    if (!element.Value) {
      return defaultValue;
    }
    // Sanity check to make sure we have at least one entry in the array.
    if (!element.Value.length) {
      return defaultValue;
    }

    return this._convertToInt(element.Value);
  }

  getModalities(Modality: any, ModalitiesInStudy: any) {
    if (!Modality && !ModalitiesInStudy) {
      return {};
    }
    const modalities = Modality || {
      vr: 'CS',
      Value: [],
    };
    if (ModalitiesInStudy) {
      if (modalities.vr && modalities.vr === ModalitiesInStudy.vr) {
        for (let i = 0; i < ModalitiesInStudy.Value.length; i++) {
          const value = ModalitiesInStudy.Value[i];
          if (modalities.Value.indexOf(value) === -1) {
            modalities.Value.push(value);
          }
        }
      } else {
        return ModalitiesInStudy;
      }
    }
    return modalities;
  }

  getName(element: any, defaultValue: any = '') {
    if (!element) {
      return defaultValue;
    }
    // Value is not present if the attribute has a zero length value
    if (!element.Value) {
      return defaultValue;
    }
    // Sanity check to make sure we have at least one entry in the array.
    if (!element.Value.length) {
      return defaultValue;
    }
    // Return the Alphabetic component group
    if (element.Value[0].Alphabetic) {
      return element.Value[0].Alphabetic;
    }
    // Orthanc does not return PN properly so this is a temporary workaround
    return element.Value[0];
  }

  getNumber(element: any, defaultValue: any = '') {
    if (!element) {
      return defaultValue;
    }
    // Value is not present if the attribute has a zero length value
    if (!element.Value) {
      return defaultValue;
    }
    // Sanity check to make sure we have at least one entry in the array.
    if (!element.Value.length) {
      return defaultValue;
    }

    return parseFloat(element.Value[0]);
  }

  getString(element: any, defaultValue: any = '') {
    if (!element) {
      return defaultValue;
    }
    // Value is not present if the attribute has a zero length value
    if (!element.Value) {
      return defaultValue;
    }
    // Sanity check to make sure we have at least one entry in the array.
    if (!element.Value.length) {
      return defaultValue;
    }
    // Join the array together separated by backslash
    // NOTE: Orthanc does not correctly split values into an array so the join is a no-op
    return element.Value.join('\\');
  }

  getDate(element: any, defaultValue: any = '') {
    // format date YYYYMMDD to YYYY-MM-DD
    return this.getString(element).replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3");
  }

  _convertToInt(input: any) {
    let output = '';
    for (let i = 0; i < input.length; i++) {
      for (let j = 0; j < input[i].length; j++) {
        output += this._padFour(input[i].charCodeAt(j).toString(16));
      }
    }
    return parseInt(output, 16);
  }

  _padFour(input: any) {
    const l = input.length;
    if (l == 0) return '0000';
    if (l == 1) return '000' + input;
    if (l == 2) return '00' + input;
    if (l == 3) return '0' + input;
    return input;
  }


}
