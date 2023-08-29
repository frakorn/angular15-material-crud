import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
    providedIn: 'root',
})
export class SampleService {

    constructor(private apiService: ApiService) { }

    createSample(name: string, description: string) {
        return this.apiService.createSample(name, description);
    }

    createTest(name: string, sampleId: string) {
        return this.apiService.createTest(name, sampleId)
    }

    deleteSample(id: string) {
        return this.apiService.deleteSample(id);
    }

    deleteTest(id: string) {
        return this.apiService.deleteTest(id);
    }

    editSample(id: string, name: string, description: string) {
        return this.apiService.editSample(id, name, description);
    }

    editTest(id: string, name: string, sampleId: string) {
        return this.apiService.editTest(id, name, sampleId);
    }

}