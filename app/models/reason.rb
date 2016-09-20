class Reason < ApplicationRecord
  validates :name,  presence: true, uniqueness: true

  has_many :bills
end
