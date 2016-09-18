module Api
  class SummaryController < ApiController

    def index
      bills = @current_user.bills.includes(:case)
      @result = {}

      bills.each do |bill|
        casename = bill.case.name

        if @result[casename].blank?
          @result[casename] = {
            'case': bill.case,
            'bills': [],
            'stats': {
              'spent': 0,
              'count': 0
            }
          }
        end

        @result[casename][:bills].push(bill)
        @result[casename][:stats][:spent] += bill.spent
        @result[casename][:stats][:count] += 1
      end
    end

  end
end
