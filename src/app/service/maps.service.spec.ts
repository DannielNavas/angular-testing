import { TestBed } from '@angular/core/testing';

import { MapsService } from './maps.service';

describe('MapsService', () => {
  let service: MapsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsService],
    });
    service = TestBed.inject(MapsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getCurrentPosition', () => {
    it('should save ', () => {
      // sirve para mockear apis del navegador cuando tienen un callback
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          const mockPosition: GeolocationPosition = {
            coords: {
              accuracy: 0,
              altitude: 0,
              altitudeAccuracy: 0,
              heading: 0,
              latitude: 10000,
              longitude: 20000,
              speed: 0,
            },
            timestamp: 0,
          };
          successFn(mockPosition);
        }
      );
      service.getCurrentPosition();
      expect(service.center.lat).toEqual(10000);
      expect(service.center.lng).toEqual(20000);
    });
  });
});
