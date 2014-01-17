class Transaction < ActiveRecord::Base
  attr_accessible :date, :description

  validates :date, :presence => true
  before_validation :ensure_date

  has_many :loans
  # does not actually have many creditors, but each loan will have one, all
  # pointing to the same user
  has_many :creditors, :through => :loans
  has_many :debtors, :through => :loans

  def creditor
    self.creditors.first
  end

  def ensure_date
    self.date ||= Date.today
  end

  def amount
    sum = 0
    self.loans.each { |loan| sum += loan.amount }
    sum
  end
end
