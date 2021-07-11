import { HttpClientTestingModule } from '@angular/common/http/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { AppComponent } from './app.component';
import { response } from './mocks/mockServiceResponse';
import { HttpServiceService } from './services/http-service.service';

describe('AppComponent', () => {
  let service: HttpServiceService;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpServiceService
      ]
    }).compileComponents();

    service = TestBed.inject(HttpServiceService);
    component = new AppComponent(service);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should call handleSearch() to get success response`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component.subject.subscribe((searchText) => {
      expect(searchText).toEqual('ayaz');
      tick(1000);
      component.handleSearch(searchText);
    });
    const handleSpy = spyOn(service, 'getRepository').and.returnValue(of(response));
    component.onInputChange('ayaz');
    fixture.detectChanges();
    expect(handleSpy).toHaveBeenCalled();
  }));

  it(`should call handleSearch() to get error response`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    component.subject.subscribe((searchText) => {
      expect(searchText).toEqual('ayaz');
      tick(1000);
      component.handleSearch(searchText);
    });
    const handleSpy = spyOn(service, 'getRepository').and.returnValue(throwError('500'));
    component.onInputChange('ayaz');
    fixture.detectChanges();
    expect(handleSpy).toHaveBeenCalled();
  }));


  it('should sort the data in default descending order(First time sorting)', () => {
    component.resultSet = response;
    const mockList = {name: 'name', value:"NAME", asc: false, desc : false};
    component.sortData(mockList);
    expect(mockList.desc).toBeTruthy();
  });

  it('should sort the data in ascending order', () => {
    component.resultSet = response;
    const mockList = {name: 'name', value:"NAME", asc: false, desc : true};
    component.sortData(mockList);
    expect(mockList.asc).toBeTruthy();
  });

  it('should sort the data in descending order', () => {
    component.resultSet = response;
    const mockList = {name: 'name', value:"NAME", asc: true, desc : false};
    component.sortData(mockList);
    expect(mockList.desc).toBeTruthy();
  });

  it('should navigate to a profile in a new tab', () => {
    let url = "https://github.com/furkanayaz/Bat-Game-with-Python-Turtle";
    const fixture = TestBed.createComponent(AppComponent);
    const windowSpy = spyOn(window, 'open').and.callThrough();
    component.navigate(url);
    fixture.detectChanges();
    expect(windowSpy).toHaveBeenCalled();
  });


});
