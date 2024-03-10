import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { ShipmentModel } from './utlis/ShipmentModel';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = 'https://localhost:44300/api'; // .NET Core API base URL

  constructor(private http: HttpClient) { }

  getShipments(): Observable<any> {
    const result = this.http.get<ShipmentModel>(`${this.baseUrl}/Shipments`)
    console.log(result)
    return result;
  }

  getCurrencies(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/Currencies`)
    console.log(result)
    return result;
  }
  getIncoterms(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/Incoterms`)
    console.log(result)
    return result;
  }
  getModes(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/Modes`)
    console.log(result)
    return result;
  }

  getPackageTypes(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/PackageTypes`)
    console.log(result)
    return result;
  }
  getSecondUnits(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/SecondUnits`)
    console.log(result)
    return result;
  }
  getUnitFirsts(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/UnitFirsts`)
    console.log(result)
    return result;
  }



  addShipments(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const result = this.http.post<ShipmentModel>(`${this.baseUrl}/Shipments`, data, { 'headers': headers });
    return result;
  }
  addMode(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const result = this.http.post<ShipmentModel>(`${this.baseUrl}/Modes`, data, { 'headers': headers });
    return result;
  }

  updateShipments(data: any, Id: any): Observable<any> {
    return this.http.put<ShipmentModel>(`${this.baseUrl}/Shipments/${Id}`, data).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null); // Return an observable with a null value in case of error
      })
    );
  }

  updateMode(data: any, Id: any) {
    return this.http.put<any>(`${this.baseUrl}/Modes/${Id}`, data).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null); // Return an observable with a null value in case of error
      })
    );
  }

  dalateShipments(Id: any): Observable<any> {
    return this.http.delete<ShipmentModel>(`${this.baseUrl}/Shipments/${Id}`).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null);
      })
    );
  }

  dalateMode(Id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/Modes/${Id}`).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null);
      })
    );
  }

  dalateMovementType(Id: any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/MovementTypes/${Id}`).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null);
      })
    );
  }
  updateMovementType(data: any, Id: any): Observable<any> {
    return this.http.put<ShipmentModel>(`${this.baseUrl}/MovementTypes/${Id}`, data).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null); // Return an observable with a null value in case of error
      })
    );
  }

  addMovementType(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const result = this.http.post<ShipmentModel>(`${this.baseUrl}/MovementTypes`, data, { 'headers': headers });
    return result;
  }

  getMovementTypes(): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/MovementTypes`)
    console.log(result)
    return result;
  }











  dalateServices(Id: any,url:any): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${url}/${Id}`).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null);
      })
    );
  }
  updateServices(data: any, Id: any,url:any): Observable<any> {
    return this.http.put<ShipmentModel>(`${this.baseUrl}/${url}/${Id}`, data).pipe(
      catchError(error => {
        console.error('Update shipment failed', error);
        return of(null); // Return an observable with a null value in case of error
      })
    );
  }

  addServices(data: any,url:any): Observable<any> {
    const headers = { 'content-type': 'application/json' }

    const result = this.http.post<ShipmentModel>(`${this.baseUrl}/${url}`, data, { 'headers': headers });
    return result;
  }

  getServicess(url:any): Observable<any> {
    const result = this.http.get<any>(`${this.baseUrl}/${url}`)
    console.log(result)
    return result;
  }






















  addUser(data: any): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const result = this.http.post<ShipmentModel>(`${this.baseUrl}/Users`, data, { 'headers': headers });
    return result;
  }


  logIn(UserName: string, Password: string): Observable<any> {
    let result: any
    try {
      const headers = { 'content-type': 'application/json' }
      result = this.http.post<ShipmentModel>(`${this.baseUrl}/Auth/login`, { UserName: UserName, Password: Password }, { 'headers': headers });
    } catch (error) {
      console.log(error)
    }
    return result;
  }

  // Add more methods to interact with other API endpoints...
}
