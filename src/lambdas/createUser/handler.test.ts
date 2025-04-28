import { handler, userService } from './handler';

describe('CreateUser Lambda Handler', () => {
  it('should return 201 when a user is created', async () => {
    const event = {
      body: JSON.stringify({ email: 'test@example.com', password: 'password' }),
    } as never;
    userService.createUser = jest.fn().mockImplementation(async (dto) => {
      return dto;
    });

    const response = await handler(event);

    expect(response.statusCode).toBe(201);
    expect(response.body).toContain('test@example.com');
  });
});
