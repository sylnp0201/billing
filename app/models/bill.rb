class Bill < ApplicationRecord
  validates :case_id,  presence: true
  validates :user_id,  presence: true
  validates :reason,  presence: true

  belongs_to :user
  belongs_to :case
  belongs_to :reason
end
