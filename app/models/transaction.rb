class Transaction < ActiveRecord::Base
  attr_accessible :date, :description, :total

  validates :date, :presence => true
  before_validation :ensure_date

  has_many :loans
  # does not actually have many creditors, but each loan will have one, all
  # pointing to the same user
  has_many :creditors, :through => :loans
  has_many :debtors, :through => :loans

  def covered_amount
    sum = 0
    self.loans.each { |loan| sum += loan.amount }
    sum
  end

  def creditor
    self.creditors.first
  end

  def creditor_id
    self.creditor.id
  end

  def creditor_share
    total - covered_amount
  end

  def debtor_ids
    ids = []
    self.debtors.each do |debtor|
      ids << debtor.id
    end
    ids
  end

  def ensure_date
    self.date ||= Date.today
  end

  def roster
    [creditor.id].concat(debtor_ids)
  end

end
