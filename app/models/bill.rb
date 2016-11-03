class Bill < ApplicationRecord
  validates :case_id,  presence: true
  validates :user_id,  presence: true

  belongs_to :user
  belongs_to :case

  before_save :correct_spent

  private
    def correct_spent
      start_time = self.start_time
      end_time = self.end_time
      s = ((end_time-start_time)/3600.0).round(2)
      if s != self.spent
        self.spent = s
      end
    end
end
