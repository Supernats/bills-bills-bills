class Transaction < ActiveRecord::Base
  attr_accessible :date

  validates :date, :presence => true
  before_validation :ensure_date

  has_many :loans

  has_one :creditor, :through => :loans

  has_many :debtors, :through => :loans

  def ensure_date
    self.date ||= Date.today
  end
end
