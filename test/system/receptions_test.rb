require "application_system_test_case"

class ReceptionsTest < ApplicationSystemTestCase
  setup do
    @reception = receptions(:one)
  end

  test "visiting the index" do
    visit receptions_url
    assert_selector "h1", text: "Receptions"
  end

  test "should create reception" do
    visit receptions_url
    click_on "New reception"

    fill_in "Firstname", with: @reception.firstname
    fill_in "Lastname", with: @reception.lastname
    click_on "Create Reception"

    assert_text "Reception was successfully created"
    click_on "Back"
  end

  test "should update Reception" do
    visit reception_url(@reception)
    click_on "Edit this reception", match: :first

    fill_in "Firstname", with: @reception.firstname
    fill_in "Lastname", with: @reception.lastname
    click_on "Update Reception"

    assert_text "Reception was successfully updated"
    click_on "Back"
  end

  test "should destroy Reception" do
    visit reception_url(@reception)
    click_on "Destroy this reception", match: :first

    assert_text "Reception was successfully destroyed"
  end
end
