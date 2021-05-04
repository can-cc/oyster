import { AuthService } from './auth.service';

beforeEach(() => {
  // ignore
});

test('auth service sign jwt', () => {
  const token = AuthService.signJwt({});
  expect(token).toBeTruthy();
});
