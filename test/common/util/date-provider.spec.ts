import { expect } from 'chai';
import { getCurrentTimestamp } from '../../../source/common/util/date-provider';

describe('Date Provider', () => {
  it('Deve retornar uma string de data no formato YYYY-MM-DD HH:mm', () => {
    const timestamp = getCurrentTimestamp();
    expect(timestamp).to.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/);
  });
});